# Use Python 3.10 Alpine image
FROM python:3.9-alpine AS app

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Create and set working directory
WORKDIR /server/backend/

# Install system dependencies for PostgreSQL and MySQL/MariaDB
RUN apk add --no-cache postgresql-dev gcc g++ python3-dev musl-dev \
    && apk add --no-cache mysql-dev mariadb-dev \
    && apk add --no-cache gfortran \
    && apk add --no-cache openblas-dev

RUN pip install --upgrade pip setuptools
RUN apk add --no-cache build-base libffi-dev
RUN pip install Cython

# Copy requirements.txt and install Python dependencies
COPY requirements.txt /server/backend/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . /server/backend/

# Set the command to run the Django app
EXPOSE 8000
CMD python3 manage.py runserver 0.0.0.0:8000 