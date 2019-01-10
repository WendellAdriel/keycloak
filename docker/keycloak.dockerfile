# comentários.
FROM debian:latest

# comentários.
MAINTAINER Pedro <pehhagah.1607@gmail.com>

# comentários.
RUN apt-get update
RUN apt-get install -y sudo

# comentários.
EXPOSE 80
EXPOSE 443
EXPOSE 8080
EXPOSE 8443