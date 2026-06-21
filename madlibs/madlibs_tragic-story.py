import random
import os
import glob
import re

def random_story():
    story_files = glob.glob(os.path.join("madlibs", "text_stories", "stories_tragic-romance", "*.txt"))
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

# Story Explanations:
# Story 1: The Melancholy of Missed Paths 
#   Inspiration: The White Nights by Fyodor Dostoevsky (themes of unrequited love, fleeting nighttime connection, and a return to loneliness).
# Story 2: The Sacrifice of Misunderstanding
#   Inspiration: The Gift of the Magi by O. Henry (but twisted into a dark, tragic irony where mutual sacrifices ruin the romance).
# Story 3: The Fatal Illusion
#   Inspiration: The Great Gatsby by F. Scott Fitzgerald (focused on obsessive love, a desperate attempt to recreate the past, and sudden tragedy).