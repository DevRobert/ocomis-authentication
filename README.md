# Ocomis Authentication API

## Scope

* Generates Java Web Tokens based on given credentials

## Context

* The Authentication API connects to the User API for verifying given credentials and retrieving basic user information.
* The Authentication UI uses the Authentication API for generating tokens in the login process.
* The Authentication API may be used by any other UIs for generating and/ or refreshing tokens.

## Tech Stack

* NodeJS

## Notes

The connection to the User API has not established yet.
Therefore, fake credentials are used.