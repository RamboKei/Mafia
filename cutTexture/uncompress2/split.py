#!python
import os,sys
from PIL import Image
import json
from os import listdir


def gen_png_from_json(json_filename, png_filename):
    file_path = plist_filename.replace('.json', '')
    big_image = Image.open(png_filename)
    json_file = open(plist_filename, "rb")
    root = json.load(json_file)
    # print(root["frames"])
    for k,v in root["frames"].items():
        name = k + ".png"
        x = v["x"]
        y = v["y"]
        width = v["w"]
        height = v["h"]
        print width, height
        box=(
            x,
            y,
            x + width,
            y + height,
        )
        sizelist = [ v["sourceW"], v["sourceH"] ]
       
        rect_on_big = big_image.crop(box)
    
        if 'rotated' in v:
            rect_on_big = rect_on_big.rotate(90)
    
        print sizelist
        result_image = Image.new('RGBA', sizelist, (0,0,0,0))
        if 'rotated' in v:
            result_box=(
                ( v["sourceW"] - height )/2,
                ( v["sourceH"] - width )/2,
                ( v["sourceW"] + height )/2,
                ( v["sourceH"] + width )/2
            )
        else:
            result_box=(
                ( v["sourceW"] - width )/2,
                ( v["sourceH"] - height )/2,
                ( v["sourceW"] + width )/2,
                ( v["sourceH"] + height )/2
            )
    
        print(result_box)
        result_image.paste(rect_on_big, result_box, mask=0)
    
        if not os.path.isdir(file_path):
            os.mkdir(file_path)
        outfile = (file_path+'/' + name).replace('gift_', '')
        #outfile = outfile + '.png'
        print( outfile, "generated")
        # if v['rotated']:
        #     result_image = result_image.rotate(90)
        result_image.save(outfile)

if __name__ == '__main__':
    print( os.getcwd())
    file_path = os.getcwd()
    for filename in listdir(file_path):
        if (not filename.endswith(".DS_Store")):
            # print filename
            portion = os.path.splitext(filename)
            # print portion[1], portion[0]
            plist_filename = portion[0] + '.json'
            png_filename = portion[0] + '.png'
            print (plist_filename, png_filename)
            if (os.path.exists(plist_filename) and os.path.exists(png_filename)):
                gen_png_from_json( plist_filename, png_filename )
            else:
                print ("make sure you have boith plist and png files in the same directory")
    # filename = sys.argv[1]
    # plist_filename = filename + '.plist'
    # png_filename = filename + '.png'
    # if (os.path.exists(plist_filename) and os.path.exists(png_filename)):
    #     gen_png_from_plist( plist_filename, png_filename )
    # else:
    #     print "make sure you have boith plist and png files in the same directory"