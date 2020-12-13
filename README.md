![build-test](https://github.com/mihyaeru21/actions-report-coveralls-perl/workflows/build-test/badge.svg)

# actions-report-coveralls-perl

[Devel::Cover::Report::Coveralls](https://github.com/kan/coveralls-perl) as an GitHub Action.


## Usage

Put this action before running tests step.
`Devel::Cover::Report::Coveralls` and `Devel::Cover` are installed.
Then, it reports to Coveralls on post.


## Example

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup perl
        uses: shogo82148/actions-setup-perl@v1
        with:
          perl-version: 5.32
      - name: Coveralls
        uses: mihyaeru21/actions-report-coveralls-perl@v1
      - name: Run tests
        env:
          HARNESS_PERL_SWITCHES: '-MDevel::Cover=+ignore,^local/|^t/'
        run: prove -lrv t
```
