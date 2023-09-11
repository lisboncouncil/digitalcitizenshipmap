#!/bin/bash

echo "Retrieving code from Github"
git pull origin main

echo "Building the scss library"
pushd web/themes/custom/citimap01/
npm run build
popd

echo "Importing new libraries"
composer install --no-dev

echo "Updating Drupal database"
./vendor/bin/drush updb -y

echo "Importing drupal cash"
./vendor/bin/drush cim -y

echo "Clearing Drupal cache"
./vendor/bin/drush cr

echo "Deploy complete"



