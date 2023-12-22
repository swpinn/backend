FROM python:3.10-slim

ENV PYTHONBUFFERED True

# Install dependencies needed for cv2
RUN apt-get update && apt-get install -y \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgl1-mesa-glx

ENV APP_HOME /app

WORKDIR $APP_HOME

COPY . ./

RUN pip install -r requirements.txt
RUN pip install opencv-python-headless

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 app:app
