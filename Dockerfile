FROM java:8
WORKDIR /
ADD exploreImages/target/exploreImages-0.0.1-SNAPSHOT.jar photovault_explore.jar
EXPOSE 6060
CMD ["java","-jar","photovault_explore.jar"]
