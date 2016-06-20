<?php
/*
This script converts excel spreadsheet to json object,
By Dmitrii Lazucov.
License GNU

Dependencies:
Uses PHPExcel library.
Use path - Classes/PHPExcel
Version - PHP 5.2.0 or higher

!!! First row in xls file must be a title row
*/

// Import PHPExcel library
require_once ('Classes/PHPExcel/IOFactory.php');

// Specimen, load xls file to encode
$xls = PHPExcel_IOFactory::load('test_price.xls');//test_price.xls chenge this on your path to xls file
$xls->setActiveSheetIndex(0);
//var $sheet is curent sheet
$sheet=$xls->getActiveSheet();


// Get header names from the first row
$row = $sheet->getRowIterator(1)->current();
$cellIterator = $row->getCellIterator();
$cellIterator->setIterateOnlyExistingCells(false);

foreach ($cellIterator as $cell) {
  //header names arry
  $header_names[]=$cell->getValue();
}


// Generate counter to separate rows
$count=count($header_names);


// Generate content array
foreach ($sheet->getRowIterator() as $row) {
  $cellIterator = $row->getCellIterator();
  //iter active row by cell
  foreach ($cellIterator as $cell) {
    //content arry (with first row wich will dell later)
    $content[]=$cell->getCalculatedValue();
  }
}


// Generate final array
$chunks=array_chunk($content, $count);
//dell first row(title row)
array_shift($chunks);


foreach ($chunks as $key => $value) {
  //fill final arry by titles & values column
  $map_content[]=array_combine($header_names, $value);
}


// Encode result to JSON
echo json_encode($map_content);

?>