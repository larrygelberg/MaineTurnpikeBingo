<?php

/**
 * Read in Lines
 **/
function read_lines($mPs, $fPs, $cPs, $mNames, $fNames, $topics, $nrcs) {
  $fp = fopen('lines.txt','r');
  if (!$fp) {echo 'ERROR: Unable to open lines.txt'; exit;}

  $row = 0;
  while (!feof($fp)) {
    $line = trim(fgets($fp,2048)); //use 2048 if very long lines
    
    $anyone = stristr($line, "<*>");
    if ($anyone != FALSE) {
      switch (mt_rand(0, 1)) {
      case 0:
	$line = str_replace("<*>", $mPs[mt_rand(0, count($mPs)-1)], $line);
	break;
      case 1:
	$line = str_replace("<*>", $fPs[mt_rand(0, count($fPs)-1)], $line);
	break;
      }
    }

    $anycouple = stristr($line, "<NRC>");
    if ($anycouple != FALSE) {
      switch (mt_rand(0, 1)) {
      case 0:
	$line = str_replace("<NRC>", $nrcs[mt_rand(0, count($nrcs)-1)], $line);
	break;
      case 1:
	$line = str_replace("<NRC>", $cPs[mt_rand(0, count($cPs)-1)], $line);
	break;
      }
    }

    $line = str_replace("<M>", $mPs[mt_rand(0, count($mPs)-1)], $line);
    $line = str_replace("<F>", $fPs[mt_rand(0, count($fPs)-1)], $line);
    $line = str_replace("<C>", $cPs[mt_rand(0, count($cPs)-1)], $line);
    $line = str_replace("<MN>", $mNames[mt_rand(0, count($mNames)-1)], $line);
    $line = str_replace("<FN>", $fNames[mt_rand(0, count($fNames)-1)], $line);
    $line = str_replace("<T>", $topics[mt_rand(0, count($topics)-1)], $line);
    $line = str_replace(",,", ",", $line);
    $line[0] = strtoupper($line[0]);
	
    $lines[] = $line;

    $fp++;
  }
  fclose($fp);
  return $lines;
}

function get_rand($max, $used) {
  $r = mt_rand(0, $max);
  $key = array_search($r, $used);
  if ($key === false) {
    return $r;
  } else {
    return get_rand($max, $used);
  }
}

?>