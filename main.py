import pandas as pd
import menu
"""
Reading .xlxs file from Excel and turning it into .csv for easier
panda file handling/reading
 
import openpyxl
read_file = pd.read_excel(r'resource/activity.xlsx')
read_file.to_csv(r'resource/activitycsv', index = None, header=True)
"""
"""
Tin Thanh Le
Junior Developer
Smeexer 0.1
This program will mix your
cryptocurrency wallet seed phrases,
adding another layer of security for
your offline key storage
"""

if __name__ == '__main__':
    df = pd.read_csv('resource/activitycsv')

    weight_choice = menu.weight_selection()
    action=menu.main_menu()
    if action==1:

    elif action==2:

    else:

    inp = input("Enter your weight and favorite activity separated by a space between them: ").split()
    query = df[[str(inp[0])]].loc[df['activity and weight in pounds']==str(inp[1])].values[0]
    activity_interval = 30
    print(f'You will burn {int(query)} calories while {inp[1]} for {activity_interval} minutes')

