<#
    Create a MySQL database.
 #>

Param(
    [Parameter(mandatory)]
    [string] $DatabaseName
)

. "$PSScriptRoot\Invoke-MySqlScript.ps1"

Invoke-MySqlScript -FileName 'create.sql'
Invoke-MySqlScript -FileName 'schema.sql' -DatabaseName $DatabaseName
Invoke-MySqlScript -FileName 'seed.sql' -DatabaseName $DatabaseName