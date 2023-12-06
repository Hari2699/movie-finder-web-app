"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/movies/most-popular/', views.fetch_most_popular, name='most-popular'),
    path('api/movies/latest-releases/', views.fetch_latest_releases, name='latest-releases'),
    path('api/movies/top-rated/', views.fetch_top_rated, name='top-rated'),
    path('api/movies/search/', views.fetch_search_results, name='search-movies'),
    path('api/movies/details/<int:movie_id>/', views.get_movieId_details, name='movie-details'),
    path('api/movies/credits/<int:movie_id>/', views.get_movie_credits, name='movie-credits'),
    path('api/movies/similar/<int:movie_id>/', views.get_similar_movies, name='similar-movies'),
]

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)