<#
    Remove a MySQL database
 #>

Param(
    [Parameter(mandatory=$false)]
    [string] $DatabaseName
)

. "$PSScriptRoot\Invoke-MySqlScript.ps1"

Invoke-MySqlScript -FileName 'remove.sql'
