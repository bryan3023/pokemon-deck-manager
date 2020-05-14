
<#
    Shared function for managing MySQL databases on Windows.
 #>

$SqlDirectory = "$PSScriptRoot\..\db\"
$MySqlExe = (Resolve-Path "$env:ProgramFiles\MySQL\MySQL Server*\bin\mysql.exe").Path

$Password = Read-Host -Prompt "MySQL local instance root password" -AsSecureString

function Invoke-MySqlScript {
    Param(
        [Parameter(mandatory)]
        [string] $FileName
    ,
        [Parameter(mandatory=$false)]
        [string]$DatabaseName
    )

    $ScriptFile = Join-Path -Path $SqlDirectory -ChildPath $FileName
    $BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($Password)
    $PlainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

    $InvokeMySql = @{
        FilePath = $MySqlExe
        ArgumentList = @(
            '-u'
            'root'
            "--password=$PlainPassword"
        )
        RedirectStandardInput = $ScriptFile
        Wait = $true
    }

    if ($DatabaseName) {
        $InvokeMySql.ArgumentList += "--database=$DatabaseName"
    }

    Start-Process @InvokeMySql
}
