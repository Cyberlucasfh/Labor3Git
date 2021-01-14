#!"C:\newxampp\perl\bin\perl.exe"

use strict;
use warnings;
use CGI;
use JSON;

my $json = JSON->new;
my $cgi = CGI->new();
my $posX = $cgi->param( "posX" );
my $posY = $cgi->param( "posY" );

my $data_to_json = {posX => $posX, posY => $posY, sum => $posX + $posY};

print "Content-Type: text/json; charset=iso-8859-1\n\n";
print $json->encode($data_to_json) . "\n";
