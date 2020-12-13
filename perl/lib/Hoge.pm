package Hoge;
use strict;
use warnings;
use utf8;

sub hoge {
    my ($a, $b) = @_;

    if ($a == 0) {
        return 0;
    }

    return $a + $b;
}

1;

