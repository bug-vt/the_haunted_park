#!/usr/bin/env python

from PIL import Image
import sys
import random

def main(argv, arc):
    if arc != 2:
        print("Please provide one image file.")
        return
    img = Image.open(argv[1])
    width, height = img.size
    pixels = list(img.getdata())
    pix = img.load()
    for x in range(width):
        for y in range(height):
            pix[x, y] = (255, 255, 255, 255)

    out = []
    x = 0
    y = 0
    for pixel in pixels:
        if pixel == (0,0,0,255):
            out.append((x, y))
        x += 1
        if x % width == 0:
            x = 0
            y += 1

    sampleOut = []
    for sample in out:
        if random.random() <= 1:
            sampleOut.append(sample)

    column = 0
    for i in sampleOut:
        print(", [%d, %d]" % (i[0], i[1]), end='')

        column += 1
        if column % 8 == 0:
            print()

        pix[i[0], i[1]] = (0, 0, 0, 255)
    
    modified_img = argv[1][0]+'_mod.png'
    img.save(modified_img)

if __name__ == '__main__':
    main(sys.argv, len(sys.argv))
