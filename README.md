# Project "Difference calculator"

This repository contains project * "Difference calculator" *, carried out during the training on programming courses [Hexlet] (https://ru.hexlet.io/?ref=235906).

### Hexlet tests and linter status:
[![Actions Status](https://github.com/drobnov/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/drobnov/frontend-project-lvl2/actions)   <a href="https://codeclimate.com/github/drobnov/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/74c9700ad4a4872559ac/maintainability" /></a>   <a href="https://codeclimate.com/github/drobnov/frontend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/74c9700ad4a4872559ac/test_coverage" /></a>  ![Node CI](https://github.com/drobnov/frontend-project-lvl2/workflows/Node%20CI/badge.svg)

Difference calculator - a program that determines the difference between two data structures.

Utility features:
  * support for different input formats: yaml, json
  * generating a report in plain text, stylish and json format

  ## Setup
  
  ` npm link `

## Usage example:

  ### format stylish
> ` $ gendiff filepath1.json filepath2.json`

  ### format plain
> ` $ gendiff --format plain filepath1.yml filepath2.yml`

  ### format json
> ` $ gendiff --format json filepath1.json filepath2.json`

### An example of the consular utility "gendiff". Calculate the difference between format files ".json".
<a href="https://asciinema.org/a/81SP8fazqv6we3F4o52wT7SCQ" target="_blank"><img src="https://asciinema.org/a/81SP8fazqv6we3F4o52wT7SCQ.svg" /></a>

### An example of the consular utility "gendiff". Calculate the difference between format files ".yml".
<a href="https://asciinema.org/a/4tLzGFWFG3wZcKwb5uUk0bspR" target="_blank"><img src="https://asciinema.org/a/4tLzGFWFG3wZcKwb5uUk0bspR.svg" /></a>

### An example of the utility "gendiff". Calculate the difference between ".json" and ".yml" file formats which are recursive structure. The data is displayed in the format "stylish".
<a href="https://asciinema.org/a/Ar4hG1rikKKfRuzD9qPDWCH9m" target="_blank"><img src="https://asciinema.org/a/Ar4hG1rikKKfRuzD9qPDWCH9m.svg" /></a>

### An example of the utility "gendiff". Calculate the difference between ".json" and ".yml" file formats which are recursive structure. The data is displayed in the format "plain".
<a href="https://asciinema.org/a/U5xbJ7cRtbe3VXnSCihNm0ANr" target="_blank"><img src="https://asciinema.org/a/U5xbJ7cRtbe3VXnSCihNm0ANr.svg" /></a>

### An example of the utility "gendiff". Calculate the difference between ".json" and ".yml" file formats which are recursive structure. The data is displayed in the format "json".
<a href="https://asciinema.org/a/Ma0UHCSSdY2ZnzVxYwxkgV5EG" target="_blank"><img src="https://asciinema.org/a/Ma0UHCSSdY2ZnzVxYwxkgV5EG.svg" /></a>
