# Import necessary libraries
import random
import numpy as np
import pandas as pd
from fuzzywuzzy import fuzz
import googlemaps
import random
from datetime import datetime, timedelta
import json
import pymongo
from pymongo import MongoClient
from bson import ObjectId

myclient = pymongo.MongoClient("mongodb+srv://RoamRoutely:LdRmLUQZrgJ9jMGy@roamroutely.vkdij34.mongodb.net/")
mydb = myclient["RR-auth"]
mycol = mydb["userinputs"]

itinerary_collection = mydb["itineraries"]

# Initialize variables to store fromDate and toDate
from_date = None
to_date = None

# Iterate through the documents and retrieve relevant data
for data in mycol.find({}, {"_id": 0}):
    for key, value in data.items():
        # Exclude specific keys
        if key not in ['createdAt', 'updatedAt', '__v']:
            # Convert datetime objects to string for better readability
            if isinstance(value, datetime):
                value = value.strftime("%Y-%m-%d %H:%M:%S")
            
            # Store fromDate and toDate
            if key == 'fromDate':
                from_date = datetime.strptime(value, "%Y-%m-%d %H:%M:%S")
            elif key == 'toDate':
                to_date = datetime.strptime(value, "%Y-%m-%d %H:%M:%S")

# Calculate the date difference if both fromDate and toDate are present
if from_date and to_date:
    date_difference = to_date - from_date
    days = date_difference.days


destination = pd.read_csv('C:/Users/Nehan Perera/OneDrive/Desktop/RR/Dataset.csv')

secret_api_key = "AIzaSyBgEDcqD2X3Hwiz4tcfMUA0XR0rUoX6CY0"
gmaps_client = googlemaps.Client(key = secret_api_key)

def match_destination_hotel(input_destination, budget, days, people_count, destination_data):
    hotel_budget = budget / 3
    PD_Value = people_count * days
    final_hotel_price = hotel_budget / PD_Value

    # Exact string matching for destination
    exact_destination_matches = destination_data[destination_data['District'].fillna('').str.lower() == input_destination.lower()]

    # Filter destinations by budget range
    if not exact_destination_matches.empty:
        budget_matches = exact_destination_matches[
            (exact_destination_matches['Hotel_Budget'] >= int(final_hotel_price) - 100) &
            (exact_destination_matches['Hotel_Budget'] <= int(final_hotel_price) + 10)
        ]
        if not budget_matches.empty:
            return budget_matches.to_dict('records')

    # Fuzzy string matching for destination
    fuzzy_matches = [(index, district, fuzz.partial_ratio(input_destination.lower(), str(district).lower())) for index, district in enumerate(destination_data['District'])]
    fuzzy_matches = sorted(fuzzy_matches, key=lambda x: x[2], reverse=True)

    best_match_index, best_match_destination, score = fuzzy_matches[0]
    if score > 75:  # Threshold for fuzzy matching
        best_match_budget = destination_data.iloc[best_match_index]['Hotel_Budget']
        if abs(int(final_hotel_price) - best_match_budget) <= 20:
            return [destination_data.iloc[best_match_index].to_dict()]

    return None  # No match found


def match_destination_restaurants(input_destination, budget, days, people_count, destination_data):
    restaurant_budget = budget / 3
    meal_budget = restaurant_budget / 2

    PD_Value = people_count * days
    final_res_price = meal_budget / PD_Value

    # Exact string matching for destination
    exact_destination_matches = destination_data[destination_data['District'].fillna('').str.lower() == input_destination.lower()]

    # Filter destinations by budget range
    if not exact_destination_matches.empty:
        budget_matches = exact_destination_matches[
            (exact_destination_matches['Restaurant_Budget'] >= int(final_res_price) - 100) &
            (exact_destination_matches['Restaurant_Budget'] <= int(final_res_price) + 10)
        ]
        if not budget_matches.empty:
            return budget_matches.to_dict('records')

    # Fuzzy string matching for destination
    fuzzy_matches = [(index, district, fuzz.partial_ratio(input_destination.lower(), str(district).lower())) for index, district in enumerate(destination_data['District'])]
    fuzzy_matches = sorted(fuzzy_matches, key=lambda x: x[2], reverse=True)

    best_match_index, best_match_destination, score = fuzzy_matches[0]
    if score > 75:  # Threshold for fuzzy matching
        best_match_budget = destination_data.iloc[best_match_index]['Restaurant_Budget']
        if abs(int(final_res_price) - best_match_budget) <= 20:
            return [destination_data.iloc[best_match_index].to_dict()]

    return None  # No match found


def match_destination_attractions(input_destination, vacation_type, destination_data):
    exact_destination_matches = destination_data[destination_data['District'].fillna('').str.lower() == input_destination.lower()]

    if not exact_destination_matches.empty:
        if vacation_type.lower() == 'religious':
            religious_attractions = exact_destination_matches['Religious_Attractions'].tolist()
            return religious_attractions

        elif vacation_type.lower() == 'cultural':
            cultural_attractions = exact_destination_matches['Cultural_Attractions'].tolist()
            return cultural_attractions

        elif vacation_type.lower() == 'shopping':
            shopping_places = exact_destination_matches['Shopping_Places'].tolist()
            return shopping_places

        elif vacation_type.lower() == 'education':
            educational_places = exact_destination_matches['Educational_Places'].tolist()
            return educational_places

        elif vacation_type.lower() == 'family':
            fun_and_family = exact_destination_matches['Fun_And_Family'].tolist()
            return fun_and_family

        else:
            print("Invalid input for the vacation type.")
            return None
    else:
        print("No matching district found.")
        return None


def select_Hotel(hotels, selected_hotels):
    available_hotels = [hotel for hotel in hotels if hotel not in selected_hotels]
    if not available_hotels:
        return None
    return random.choice(available_hotels)


def select_Restaurant(restaurants, selected_restaurants):
    available_restaurants = [restaurant for restaurant in restaurants if restaurant not in selected_restaurants]
    if not available_restaurants:
        return None
    return random.choice(available_restaurants)


def select_Attractions(attractions, selected_attractions):
    available_attractions = [attraction for attraction in attractions if attraction not in selected_attractions]
    if not available_attractions:
        return None
    return random.choice(available_attractions)


def get_Distance(user_location, input_destination):
    source = user_location
    destination = input_destination

    try:
        direction_result = gmaps_client.directions(source, destination)

        if direction_result and 'legs' in direction_result[0]:
            distance = direction_result[0]['legs'][0]['distance']['text']
            duration = direction_result[0]['legs'][0]['duration']['text']

            return distance, "away and take an estimated time of" ,duration
        else:
            return "Directions not found"
    except googlemaps.exceptions.ApiError as e:
        return f"Directions: {e}"

itinerary_list = []

def print_Itinerary(numberDays):
    global itinerary_list

    selected_hotels = []
    selected_restaurants = []
    selected_attractions = []

    hotel = select_Hotel(hotels, selected_hotels)
    if hotel:
        selected_hotels.append(hotel)
    rounded_distance = get_Distance(user_location, input_destination)

    # Print trip start itinerary
    Trip_Start_Itinerary = ["Travel from your location:", user_location, "to the hotel:", hotel, rounded_distance]
    Start_Itinerary = ' '.join(map(str, Trip_Start_Itinerary))

    # Append the start itinerary details to the list
    itinerary_list.append({
        "content": Start_Itinerary
    })

    dayCount = 1
    for day in range(1, numberDays + 1):
      restaurant1 = select_Restaurant(restaurants, selected_restaurants)

      if restaurant1:
          selected_restaurants.append(restaurant1)
      restaurant2 = select_Restaurant(restaurants, selected_restaurants)

      if restaurant2:
          selected_restaurants.append(restaurant2)
      restaurant3 = select_Restaurant(restaurants, selected_restaurants)

      if restaurant3:
          selected_restaurants.append(restaurant3)
      attraction1 = select_Attractions(attractions, selected_attractions)

      if attraction1:
          selected_attractions.append(attraction1)
      attraction2 = select_Attractions(attractions, selected_attractions)

      if attraction2:
          selected_attractions.append(attraction2)
      attraction3 = select_Attractions(attractions, selected_attractions)

      if attraction3:
          selected_attractions.append(attraction3)
      attraction4 = select_Attractions(attractions, selected_attractions)

      if attraction4:
          selected_attractions.append(attraction4)


      Itinerary1 = ["Day", dayCount, "-", "Have breakfast at the hotel ", hotel, "Next, Go to the first atraction site of the trip: ", attraction1,"which is", get_Distance(hotel, attraction1) if hotel and attraction1 else None, ".For lunch, go to the restaurant: ",
                    restaurant1, "which is", get_Distance(restaurant1, attraction1) if restaurant1 and attraction1 else None, "from", attraction1, "Next go the attraction site ", attraction2,"which is",
                    get_Distance(restaurant1, attraction2) if restaurant1 and attraction2 else None, "For dinner, go to the restaurant", restaurant2,
                    "which is", get_Distance(restaurant2, attraction2) if restaurant2 and attraction2 else None, " Finally go back to the hotel that is", get_Distance(restaurant2, hotel) if restaurant2 and hotel else None]

      Itinerary2 = ["Day", dayCount, "-", "Have breakfast at the hotel ", hotel, "Go to the atraction site: ", attraction1, "which is", get_Distance(hotel, attraction1) if hotel and attraction1 else None, "From there go visit the next attraction site",
                    attraction2, "which is", get_Distance(attraction1, attraction2) if attraction1 and attraction2 else None, "to visit. Next go the restaurant", restaurant1, "which is",
                    get_Distance(restaurant1, attraction2) if restaurant1 and attraction2 else None, "Next go vist", attraction3, "which is", get_Distance(restaurant1, attraction3) if restaurant1 and attraction3 else None, "For dinner, go to the restaurant",
                    restaurant2, "which is", get_Distance(restaurant2, attraction3) if restaurant2 and attraction3 else None, "Finally go back to the hotel", get_Distance(restaurant2, hotel) if restaurant2 and hotel else None]

      Itinerary3 = ["Day", dayCount, "-", "Have breakfast at the hotel", hotel, "Next go the first attraction site: ", attraction1, "which is", get_Distance(hotel, attraction1) if hotel and attraction1 else None, "From there go visit the next attraction site",
                    attraction2, "which is", get_Distance(attraction2, attraction1) if attraction2 and attraction1 else None, "For lucnch, go the restaurant: ", restaurant1, "that takes",
                    get_Distance(restaurant1, attraction2) if restaurant1 and attraction2 else None, "After having lunch go to site", attraction3, "which has a wonderful scenery. It is",
                    get_Distance(restaurant1, attraction3) if restaurant1 and attraction3 else None, "Next go the attraction site", attraction4, "Which is", get_Distance(attraction3, attraction4) if attraction3 and attraction4 else None,
                    "Finally for dinner, go the restaurant", restaurant2, "which is", get_Distance(restaurant1, attraction1) if restaurant1 and attraction1 else None, "from", attraction4, "After dinner return back to the hotel", hotel]

      Itinerary4 = ["Day", dayCount, "-", "For breakfast go the restaurant", restaurant1, "which is", get_Distance(restaurant1, hotel) if restaurant1 and hotel else None, "from the hotel. Go to the first attraction site of the day", attraction1, "which is",
                    get_Distance(restaurant1, attraction1) if restaurant1 and attraction1 else None, "For lunch go the restaurant", restaurant2, "which is", get_Distance(restaurant2, attraction1) if restaurant2 and attraction1 else None,
                    "Next go to the attraction site", attraction2, "which is", get_Distance(restaurant2, attraction2) if restaurant2 and attraction2 else None,"Return back to the hotel bit early from the restuarant, which is",
                    get_Distance(hotel, attraction2) if hotel and attraction2 else None, "and have an evening tea at the hotel. For dinner order food from the restaurant", restaurant3]

      Itinerary5 = ["Day", dayCount, "-", "For breakfast go the restaurant", restaurant1, "which is", get_Distance(restaurant1, hotel) if restaurant1 and hotel else None, "from the hotel. Go to the first attraction site of the day", attraction1,
                    "which is", get_Distance(restaurant1, attraction1) if restaurant1 and attraction1 else None, "For lunch go the restaurant", restaurant2, "which is",
                    get_Distance(restaurant2, attraction1) if restaurant2 and attraction1 else None, "Next go to the attraction site", attraction3, "which is", get_Distance(restaurant2, attraction2) if restaurant2 and attraction2 else None,
                    "From there go visit the next attraction site", attraction4, "which is", get_Distance(attraction3, attraction2) if attraction3 and attraction2 else None, "For dinner go to the restaurant", restaurant3, "which is",
                    get_Distance(restaurant3, attraction3) if restaurant3 and attraction3 else None, "Finally return back to the hotel which is", get_Distance(restaurant3, hotel) if restaurant3 and hotel else None,]



      selected_itinerary = random.choice([Itinerary1, Itinerary2, Itinerary3, Itinerary4, Itinerary5])
      selected_itinerary_str = ' '.join(map(str, selected_itinerary))

      # Append the selected itinerary details to the list
      itinerary_list.append({
        "content": selected_itinerary_str
      })

      dayCount = dayCount + 1

    # Print trip end itinerary
    Trip_End_Itinerary = ["Travel from the hotel:", hotel, "back to your residence:", user_location, rounded_distance]
    End_Itinerary = ' '.join(map(str, Trip_End_Itinerary))

    # Append the end itinerary details to the list
    itinerary_list.append({
        "content": End_Itinerary
    })

def store_itinerary_in_mongodb(itinerary_list):
    # Create a single document with a list of itineraries
    itinerary_document = {
        "itineraries": itinerary_list
    }
    itinerary_collection.insert_one(itinerary_document)

hotels = []
restaurants = []
attractions = []

# Assign values to variables for input statements
user_location = data.get('userLocation', '')
input_destination = data.get('location', '')
budget = data.get('estimatedBudget', 0)
days = days if 'days' in locals() else 0 
people_count = data.get('travelingCount', 0)
vacation_type = data.get('TypeofTrip', '')


# Perform matching
matched_hotel_destinations = match_destination_hotel(input_destination, budget, days, people_count, destination)
matched_restaurant_destinations = match_destination_restaurants(input_destination, budget, days, people_count, destination)
matched_destination_attractions = match_destination_attractions(input_destination, vacation_type, destination)

# Output results
if matched_hotel_destinations:
    for matched_dest in matched_hotel_destinations:
      hotels.append(matched_dest["Hotels"])
else:
    print()

if matched_restaurant_destinations:
    for matched_dest in matched_restaurant_destinations:
        restaurants.append(matched_dest["Restaurants"])
else:
    print()

if matched_destination_attractions:
    attractions.extend(matched_destination_attractions)
else:
    print()

print_Itinerary(days)

store_itinerary_in_mongodb(itinerary_list)