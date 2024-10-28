FROM elixir:1.16.1-alpine

# test installation dépendance pour bcrypt
RUN apk add --no-cache build-base
RUN apk update && apk add postgresql-client

RUN mkdir /timemanager
COPY . /timemanager/
COPY entrypoint.sh /timemanager/
COPY seed_data.sql /timemanager/

WORKDIR /timemanager

RUN mix local.hex --force
# RUN mix deps.clean --all
RUN mix deps.get
RUN mix local.rebar --force

EXPOSE 4001

RUN chmod +x /timemanager/entrypoint.sh

ENTRYPOINT ["/timemanager/entrypoint.sh"]
