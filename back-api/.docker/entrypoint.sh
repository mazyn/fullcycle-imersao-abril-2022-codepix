#!/usr/bin/env bash

yarn install
yarn run typeorm migration:run
yarn run console fixtures
yarn run start:dev