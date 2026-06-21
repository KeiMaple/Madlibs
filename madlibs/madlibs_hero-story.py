import random
import os
import glob
import re

def random_story():
    story_files = glob.glob(os.path.join("madlibs", "text_stories", "stories_heroes", "*.txt"))
    chosen_file = random.choice(story_files)
    print(f"Selected story: {chosen_file}")
    return chosen_file

def read_story(chosen_file):
    with open(chosen_file, 'r') as file:
        story = file.read()
        return story

def scan_words(story):
    placeholders = re.findall(r'\{(.*?)\}', story)
    return placeholders

def unique_placeholder(placeholders):
    answers = {}
    for placeholder in dict.fromkeys(placeholders):
        answers[placeholder] = input(f"{placeholder.capitalize()}: ")
    return answers

def fill_in_story(story, answers):
    for placeholder, answer in answers.items():
        story = story.replace(f"{{{placeholder}}}", answer)
    print(story)

if __name__ == "__main__":
    chosen_file = random_story()
    story = read_story(chosen_file)
    placeholders = scan_words(story)
    answers = unique_placeholder(placeholders)
    fill_in_story(story, answers)
else:
    print("This module is not meant to be imported. Please run it directly.")