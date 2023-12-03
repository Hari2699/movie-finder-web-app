import requests
from django.http import JsonResponse
from django.conf import settings

def make_api_request(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        return JsonResponse(response.json())
    except requests.exceptions.HTTPError as err:
        return JsonResponse({'error': str(err)}, status=400)

def fetch_most_popular(request):
    response = requests.get(f"{settings.BASE_URL}/movie/popular?api_key={settings.API_KEY}")
    return JsonResponse(response.json())

def fetch_latest_releases(request):
    response = requests.get(f"{settings.BASE_URL}/movie/now_playing?api_key={settings.API_KEY}")
    return JsonResponse(response.json())

def fetch_top_rated(request):
    response = requests.get(f"{settings.BASE_URL}/movie/top_rated?api_key={settings.API_KEY}")
    return JsonResponse(response.json())

def fetch_search_results(request):
    query = request.GET.get('query', '')
    response = requests.get(f"{settings.BASE_URL}/search/movie?query=${query}&api_key={settings.API_KEY}")
    return JsonResponse(response.json())

def get_movieId_details(request, movie_id):
    response = requests.get(f"{settings.BASE_URL}/movie/{movie_id}?api_key={settings.API_KEY}")
    return JsonResponse(response.json())

def get_movie_credits(request, movie_id):
    response = requests.get(f"{settings.BASE_URL}/movie/{movie_id}/credits?api_key={settings.API_KEY}")
    return JsonResponse(response.json())

def get_similar_movies(request, movie_id):
    response = requests.get(f"{settings.BASE_URL}/movie/{movie_id}/similar?api_key={settings.API_KEY}")
    return JsonResponse(response.json())