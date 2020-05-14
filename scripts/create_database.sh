#!/bin/sh

#
# Create database artifacts and seed the starter data.
#

db_name=$1

function run_myssql_script() {
    if [ -f $1 ] ; then
        if [ -n "$3" ] ; then
            /usr/local/mysql/bin/mysql -u root --password=$2 --database=$3 < $1 > /dev/null
        else
            /usr/local/mysql/bin/mysql -u root --password=$2 < $1 > /dev/null
        fi
    else
        echo "Files '$1' not found. Skipping."
    fi
}

read -s -p "MySQL local instance root password:" password
echo

run_myssql_script ./db/create.sql $password
run_myssql_script ./db/schema.sql $password $db_name
run_myssql_script ./db/seed.sql $password $db_name
