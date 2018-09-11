CSV to HTML table converter with SUM function
==========

This simple javascript script converts CSV file to HTML table with the possibility of sum function.

## Getting Started

After downloading this repository open file named index.html, this file is example os usage.

## CSV file structure

1. row are types of columns - str = string, sum = sum function will be applied
2. row are names of columns
3. and everything else are data

## HTML table structure
1\. row are names from 2. row of CSV file
Last row are sum function results - if no sum is declared in first row this row will not be showed, unit will be parsed from 3. row and specific column

## Functions

Script contains two functions:
 * `csv2html_GET_file(path, config, call_function);`
    This function will create async GET request to the gived path. After successful file download it will execute call_function with file content and config as parameters.
 * `csv2html_convert(in_csv, config);`
    This function will parse csv and then insert it to the html table with id given in config array. Read more about config array in Config variable section.

### Config variable
Config variable is simple array with key and value. It can contains:
 * `table_id` - id of html table where the content is to be inserted - this key is necessary
 * `table_header_class` - this class name will be added to th header tags
 * `table_body_class` - this class name will be added to td body tags
 * `table_end_class` - this class name will be added to td end tags (used for sum function)
 * `sum_ignore_string` - string which will be inserted to end row of type str - default is "-"
 * `delimiter` - csv delimiter - default is ","
