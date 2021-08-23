"""
Tin Thanh Le
Software Developer
Simple calorie counter program with information provided as reference from an
activity tracking sheet from prevea.com/leadwell
Reading .xlxs file from Excel and turning it into .csv for easier
panda file handling/reading

import openpyxl
read_file = pd.read_excel(r'resource/activity.xlsx')
read_file.to_csv(r'resource/activitycsv', index = None, header=True)
"""


import pandas as pd
import menu

if __name__ == '__main__':

    df = pd.read_csv('resource/activities.csv')
    pd.set_option("display.max_rows", None, "display.max_columns", None)

    action = menu.main_menu()
    while action in (1,2):
        if action == 1:
            print(df['Activities'])
            action = menu.main_menu()
        else:
            activity_number = int(input("Select activity number from provided list(enter '100' to see)"))
            while activity_number == 100:
                print(df['Activities'])
                activity_number = int(input("Select activity number from provided list(enter '100' to see)"))
            info = input("Enter your weight and duration in minutes separated by a space: ").split()
            query = df[info[0]][activity_number]
            print(f'You will burn {int(query)*int(info[1])/30} calories while { df["Activities"][activity_number]} for {info[1]} minutes')
            action = menu.main_menu()


