import glob

filelist = glob.glob('./images/campusLogos/*/*')



with open('codeSheet.txt', 'w') as f:
    for path in filelist:
        newpath = f'src/{path[2:]}'
        name = path.split('/')[-1].split('.')[0]
        name = name.replace('[크기변환]', '')
        f.write('{\n')
        f.write(f'  name: \'{name}\', \n')
        f.write(f'  short: \'{name[:2]}\', \n')
        f.write(f'  logo: \'{newpath}\',' + '\n')
        f.write('},\n')
