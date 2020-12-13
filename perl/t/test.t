use strict;
use warnings;
use utf8;

use Test;

BEGIN { plan tests => 1 }

use Hoge;

ok Hoge::hoge(1, 2) eq 3;

