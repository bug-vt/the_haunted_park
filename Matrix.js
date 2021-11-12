/**
 * Matrix.js
 * Author : Bug Lee
 * Last modified : 11/12/21
 *
 * This module contains Matrix, RotationMatrix, and ShiftMatrix data structure.
 * Rotation matrix and shift (or translation) matrix is built on top
 * of Matrix data structure and provide convenient utility to 
 * manipulate data such as image.
 */


"use strict";

/**
 * Matrix is assume to be a row matrix,
 * which simplify the matrix-matrix multiplication.
 */
var Matrix = {

    /**
     * Perform a matrix-matrix multiplication.
     * @param col_matrix n-dimensional column matrix.
     * @return resulting matrix resulting from multiplication.
     */
    mult: function(row_matrix, col_matrix) {
        let out = [];
        if (Matrix.isVector(col_matrix)) {
            for (let row = 0; row < row_matrix.length; row++) {
                out.push(Matrix.dot(row_matrix[row], col_matrix));
            }
        }
        else {
            for (let col = 0; col < col_matrix.length; col++) {
                let vector = [];
                for (let row = 0; row < row_matrix.length; row++) {
                    vector.push(Matrix.dot(row_matrix[row], col_matrix[col]));
                }
                out.push(vector);
            }
        }

        return out;
    },

    /**
     * Perform a dot product between two vectors.
     * @row_vec row vector.
     * @col_vec column vector.
     * @return scalar value resulting from dot product.
     */
    dot: function(row_vec, col_vec) {
        let out = 0;
        for (let i = 0; i < row_vec.length; i++) {
            out += row_vec[i] * col_vec[i];
        }
        return out;
    },

    isVector: function(col_matrix) {
        return typeof col_matrix[0] === 'number';
    },

    /**
     * Add additional dimension to a each vectors in the matrix.
     * Unlike the name, this will work for any dimension,
     * not just cartesian coordinate.
     */
    cartesian2homogeneous: function(matrix) {
        for (let i = 0; i < matrix.length; i++) {
            matrix[i].push(1);
        }
    },

    /**
     * Apply a inverse homogeneous function to current matrix.
     * Again, this will work for any dimension, 
     * not just cartesian coordiante.
     */
    homogeneous2cartesian: function(matrix) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length - 1; j++) {
                matrix[i][j] = matrix[i][j] / matrix[i][matrix[i].length - 1];
                matrix[i].pop();
            }
        }
    }
}
        

/**
 * As name imply, RotationMatrix is a predefine
 * matrix such that multiplication will result a rotation.
 */
function RotationMatrix(degree) {
    var r_matrix;
    setRotation(degree);

    /**
     * Set the degree of rotation.
     * @param degree (not in radian).
     */
    function setRotation(degree) {
        let theta = degree / 180 * PI;
        r_matrix = [[cos(theta), -sin(theta)], [sin(theta), cos(theta)]];
    }

    /**
     * Apply a matrix multiplication.
     * @param col_matrix column matrix.
     * @return matrix resulting from matrix-matrix multiplication.
     */
    function mult(col_matrix) {
        return Matrix.mult(r_matrix, col_matrix);
    }

    var publicAPI = {
        setRotation: setRotation,
        mult: mult
    }

    return publicAPI;
}

/**
 * As name imply, ShiftMatrix is a predifine
 * matrix such that multiplication will result a translation.
 * Note that column matrix that would use for the multiplication
 * need to be first converted to homogeneous coordiante.
 */
function ShiftMatrix(offsetX, offsetY) {
    var t_matrix;
    setOffset(offsetX, offsetY);

    /**
     * Set shift amount in x and y direction.
     * @param shiftX value for shifting in x direction.
     * @param shiftY value for shifting in y direciton.
     */
    function setOffset(shiftX, shiftY) {
        t_matrix = [[1, 0, shiftX], [0, 1, shiftY], [0, 0, 1]];
    }
   
    /**
     * Apply a matrix multiplication.
     * @param col_matrix column matrix. Must be in homogeneous coordinate.
     * @return matrix resulting from matrix-matrix multiplication.
     */
    function mult(col_matrix) {
        return Matrix.mult(t_matrix, col_matrix);
    }

    var publicAPI = {
        setOffset: setOffset,
        mult: mult
    }

    return publicAPI;
}
