<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<title>Crazy Relatives Bingo!</title>
<link href="styles.css" type="text/css" rel="stylesheet" />
</head>

<body bgcolor="">
<div align="center">Just in time for the holidays, it's....<br/>
<img src="images/title.gif" width="440" height="60">
</div>

<blockquote>
<p align="left">You know, there is no such thing as a
&quot;functional family&quot;.&nbsp; All families are screwed up.&nbsp; Some in big ways,
some in small, but be assured that it's not just your family that has skeletons
in the closet and black sheep that no one talks about.&nbsp; All families are
screwed up.&nbsp; </p>
<p align="left">So you might as well have some fun with it!</p>
<p align="left">Welcome to &quot;<b>Crazy Relatives Bingo!</b>&quot; -
the game that can turn every tedious reunion, get-together, wedding, Bar
Mitzvah, whatever into hours of wicked fun! All you need to do is print out a new page for each player. Check off boxes as you see bad behavior - 5 in a row wins! </p>
</blockquote>
<div align="center">
<table  width="80%">
	<tr>
			<td class="noborder" colspan="5">
			<table width="100%" class="blank"><tr>
			  <td class="noborder"><img src="images/B.gif" alt="B" /></td>

		        <td class="noborder"><img src="images/I.gif" alt="B" /></td>

		        <td class="noborder"><img src="images/N.gif" alt="B" /></td>

		        <td class="noborder"><img src="images/G.gif" alt="B" /></td>

	          <td class="noborder"><img src="images/O.gif" alt="B" /></td>
			  </tr></table>
		    </td>
</tr>
<?php
include('counter.php');

/*
 * Male Pronouns
 */
$mPs[] = "Dad";
$mPs[] = "Grampie";
$mPs[] = "your Grandfather";
$mPs[] = "your boss";
$mPs[] = "your uncle";
$mPs[] = "Uncle <MN>";
$mPs[] = "your brother";
$mPs[] = "your brother, <MN>,";
$mPs[] = "your brother-in-law";
$mPs[] = "your brother-in-law, <MN>,";
$mPs[] = "your father-in-law";
$mPs[] = "Cousin <MN>";
$mPs[] = "your nephew";
$mPs[] = "your cousin";
$mPs[] = "your best friend";
$mPs[] = "your best friend, <MN>,";
$mPs[] = "your best friend's husband";
$mPs[] = "your Best Man";
$mPs[] = "your ex";
$mPs[] = "your college roommate";
$mPs[] = "Weird Uncle <MN>";
$mPs[] = "<MN>";

/*
 * Male Names
 */
$mNames[] = "George";
$mNames[] = "Ralphie";
$mNames[] = "Lenny";
$mNames[] = "Abe";
$mNames[] = "Mortimer";
$mNames[] = "Bob";
$mNames[] = "Joe";
$mNames[] = "Joe-Bob";
$mNames[] = "Henry";
$mNames[] = "Irving";
$mNames[] = "Rodney";
$mNames[] = "Nathan";
$mNames[] = "Bernie";
$mNames[] = "Danny";
$mNames[] = "Alfonso";
$mNames[] = "Quincy";
$mNames[] = "Ricardo";
$mNames[] = "Holger";


/*
 * Female Names
 */
$fNames[] = "Sylvia";
$fNames[] = "Ruthie";
$fNames[] = "Gertrude";
$fNames[] = "Renata";
$fNames[] = "Rosie";
$fNames[] = "Alice";
$fNames[] = "Heather";
$fNames[] = "Louise";
$fNames[] = "Rebecca";
$fNames[] = "Dagmara";
$fNames[] = "Trudy";
$fNames[] = "Helen";
$fNames[] = "Brittany";
$fNames[] = "Beatrice";


/*
 * Female Pronouns
 */
$fPs[] = "Mom";
$fPs[] = "Grandma";
$fPs[] = "your aunt";
$fPs[] = "Aunt <FN>";
$fPs[] = "your sister";
$fPs[] = "your sister-in-law";
$fPs[] = "your sister, <FN>,";
$fPs[] = "your sister-in-law, <FN>,";
$fPs[] = "Cousin <FN>";
$fPs[] = "your niece";
$fPs[] = "your best friend";
$fPs[] = "your Maid-of-Honor";
$fPs[] = "your college roommate";
$fPs[] = "your cousin";
$fPs[] = "your best friend's wife";
$fPs[] = "your mother-in-law";
$fPs[] = "your boss";
$fPs[] = "your ex";
$fPs[] = "<FN>";

/*
 * Couple Pronouns
 */
$cPs[] = "A couple";
$cPs[] = "Mom and Dad";
$cPs[] = "Grandma and Grandpa";
$cPs[] = "Uncle <MN> and Aunt <FN>";
$cPs[] = "your Uncle and Aunt";
$cPs[] = "your brother- and sister-in-law";
$cPs[] = "your best friend and his wife";
$cPs[] = "your boss and her husband";
$cPs[] = "your boss and his wife";
$cPs[] = "your in-laws";

/*
 * Non-romantic couples
 */
$nrcs[] = "your cousins";
$nrcs[] = "your brothers";
$nrcs[] = "your sisters";
$nrcs[] = "your sisters";

/*
 * Topics
 */
$topics[] = "the second amendment";
$topics[] = "'intelligent design'";
$topics[] = "splitting the tab";
$topics[] = "politics";
$topics[] = "religion";
$topics[] = "opposing sports teams";
$topics[] = "differing religion";
$topics[] = "opposing sports teams";
$topics[] = "global warming";
$topics[] = "Hillary";
$topics[] = "Trump";
$topics[] = "Biden";
$topics[] = "QAnon";
$topics[] = "abortion rights";
$topics[] = "the Jan 6th insurrection";
$topics[] = "MAGA";
$topics[] = "Obama";
$topics[] = "the election";
$topics[] = "climate change";
$topics[] = "electric vehicles";
$topics[] = "the surveillance state";


require('read_data.php');
$lines = read_lines($mPs, $fPs, $cPs, $mNames, $fNames, $topics, $nrcs);
$used = array();

for ($i=0; $i < 5; $i++) {
  echo "<tr>";
  for ($j=0; $j<5; $j++) {
    if (($i == 2) && ($j == 2)) {
      echo "<td  class=\"centered\" width=\"20%\"><strong>FREE<br/>SPACE</strong></td>";
    } else {
      $r = get_rand(count($lines)-1, $used);
      $used[] = $r;
      $line = $lines[$r];
      echo "<td class=\"centered\"><font face=\"Tahoma\" size=\"2\">$lines[$r]</td>";
    }
  }
  echo "</tr>";
}

?>
</table>
<br/>
<FORM METHOD="LINK" ACTION="index.php">
<INPUT TYPE="submit" VALUE="Randomize Me, Baby!">
</FORM>
</div>

<blockquote>
<p align="left"><b>Rules:</b></p>
<ol>
	<li>
	<p align="left">Each player prints out a unique card.&nbsp;
	Each time you witness some atrocious behavior that matches a square entry,
	cross that square out.&nbsp; The first player to get five squares in a row
	(horizontally, vertically, or diagonally) cries out &quot;BINGO!&quot; and is declared
	the winner!&nbsp; Nothing could be easier, right?</li>
<li>
	If you get a <b>Bonus</b> square, you may take an additional square as well!
</li>
<li>
	<p align="left">Our pronouns are generic.&nbsp; When we
	say &quot;Uncle Bob&quot; it doesn't have to be a literal &quot;Uncle Bob&quot; - it could be
	&quot;Cousin Joe&quot;, &quot;Dad&quot;, or even lovable old &quot;Grampie&quot;.</li>
	<li>
	<p align="left">This is honor-system based, but
	if you are able to collect photographic evidence, you can use that as a <b>BONUS</b> square and
	take any extra square of your choice!</li>
</ol>

Do you have your own stories that you think would fit in great here?  Send them to
<a href="mailto:bebopdaddy@gmail.com">BebopDaddy@gmail.com</a>!  We'd love to hear from you and will put them in the mix!
</blockquote>
<table class="blank" width="100%">
  <tr>
    <td class="blank"><div align="left">
      <font size="1">&copy; Copyright 2007 - CrazyRelativesBingo.com</font></div>
    </td>
    <td class="blank"><div align="right"><?=$total?> hits so far!</div></td>
  </tr>
</table>
</body>
</html>
