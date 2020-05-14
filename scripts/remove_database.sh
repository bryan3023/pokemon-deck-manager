#!/bin/sh

#
# Delete database artifacts once we're done with them.
#

function run_myssql_script() {
    if [ -f $1 ]
    then
        /usr/local/mysql/bin/mysql -s -u root --password=$2 < $1 > /dev/null
    else
        echo "Files '$1' not found. Skipping."
    fi
}

read -s -p "MySQL local instance root password:" password
echo

run_myssql_script ./db/remove.sql $password
