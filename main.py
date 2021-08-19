"""
Tin Thanh Le
Junior Developer
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

    weight_choice = menu.weight_selection()
    action = menu.main_menu()
    if action == 1:
        print(df['Activities'])
        action=menu.main_menu()
    else:
        activity_number = int(input("Select activity number from provided list(choose 1 to see) "))
        info = input("Enter your weight and duration in minutes separated by a space: ").split()
        query = df[info[0]][activity_number]
        print(f'You will burn {int(query)*int(info[1])/30} calories while { df["Activities"][activity_number]} for {info[1]} minutes')


