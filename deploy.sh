#!/bin/bash

# Ensure `jq` is installed
sudo apt-get install jq

# Log in to ECR
echo $(aws ecr get-authorization-token --region us-east-1 --output text --query 'authorizationData[].authorizationToken' | base64 -d | cut -d: -f2) | docker login -u AWS https://876436170208.dkr.ecr.us-east-1.amazonaws.com --password-stdin

# Build, tag, and push `ner1vah0s` to ECR
docker build -t ner1vah0s .
docker tag ner1vah0s:latest 876436170208.dkr.ecr.us-east-1.amazonaws.com/ner1vah0s:latest
docker push 876436170208.dkr.ecr.us-east-1.amazonaws.com/ner1vah0s:latest

# Stop the existing task
EXISTING_TASK_ARN=`aws ecs list-tasks --region us-east-1 --cluster meeper-cluster --service-name ner1vah0s-service | jq -r '.taskArns[0]'`
aws ecs stop-task --region us-east-1 --cluster meeper-cluster --task "$EXISTING_TASK_ARN"

# Get the existing task definition JSON for the ner1vah0s-task-definition family
aws ecs describe-task-definition --region us-east-1 --task-definition ner1vah0s-task-definition | \
# aws ecs register-task-definition is particular about what keys are present
jq '.taskDefinition | del(.requiresAttributes, .revision, .status, .taskDefinitionArn, .compatibilities)' > ner1vah0s-task-definition.json

# Register a new task definition version
NEW_TASK_DEFINITION_ARN=`aws ecs register-task-definition --region us-east-1 --family ner1vah0s-task-definition --cli-input-json file://ner1vah0s-task-definition.json | jq -r '.taskDefinition.taskDefinitionArn'`

# Delete the task definition JSON file
rm ner1vah0s-task-definition.json

# Update ner1vah0s-service to use the new task definition version
aws ecs update-service --region us-east-1 --cluster meeper-cluster --service ner1vah0s-service --task-definition "$NEW_TASK_DEFINITION_ARN"
