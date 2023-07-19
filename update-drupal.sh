#!/bin/sh

composer update "drupal/core-*" --with-all-dependencies

drush updb && drush cr
