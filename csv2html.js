function csv2html_GET_file(path, config, call_function){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			call_function(this.responseText, config);
		}
	}
	xhttp.open("GET", path, true);   //GET request, file path, async request
	xhttp.send();
}


		
function csv2html_convert(in_csv, config){	
	var table_id = "";
	var table_header_class = "";
	var table_body_class = "";
	var table_end_class = "";
	var sum_ignore_class = "";

	var sum_ignore_string = "-";
	var delimiter = ",";


	//-----parse configuration-----
	table_id = config["table_id"];

	if(config.hasOwnProperty("table_header_class")) table_header_class = " class=\"" + config["table_header_class"] + "\"";
	if(config.hasOwnProperty("table_body_class")) table_body_class = " class=\"" + config["table_body_class"] + "\"";
	if(config.hasOwnProperty("table_end_class")) table_end_class = " class=\"" + config["table_end_class"] + "\"";

	if(config.hasOwnProperty("sum_ignore_string")) sum_ignore_string = config["sum_ignore_string"];

	if(config.hasOwnProperty("delimiter")) delimiter = config["delimiter"];
	//-----parse configuration-----


	csv = in_csv.split('\n');   //split csv file by newlines
	var fin_html = "";   //final table html content

	var sum_arr = new Array();   //array of SUM value
	var type_arr = new Array();   //array of columns types

	for(var a = 0; a < csv.length; a ++){   //go through csv file content
		if(csv[a]){   //ignore blank lines
			var line = csv[a].split(delimiter);   //split line by delimiter

			if(a == 0){   //first line is columns types
				for(var b = 0; b < line.length; b ++){   //go through line values
					sum_arr[b] = 0;   //null sum arry value

					//save columns types
					if(line[b] == "str") type_arr[b] = 0;
					if(line[b] == "sum") type_arr[b] = 1;
				}
			}else{
				fin_html += "<tr>\n";   //new row start tag

				for(var b = 0; b < line.length; b ++){   //go through line values
					var elm = line[b];   //actual value

					if(type_arr[b] == 1 && a > 1) sum_arr[b] += get_num(elm);   //check column type and plus new value

					var type_ = "";

					if(a == 1) fin_html += "<th" + table_header_class + ">" + elm + "</th>\n";   //html header
					if(a > 1) fin_html += "<td" + table_body_class + ">" + elm + "</td>\n";   //html body or end
				}

				fin_html += "</tr>\n";   //new row end tag
			}
		}
	}

	if(1 in type_arr){   //check if we have any sum type in array
		fin_html += "<tr>\n";   //add new row start tag

		for(var q = 0; q < sum_arr.length; q ++){   //go through sum array
			if(type_arr[q] == 0) fin_html += "<td" + table_end_class + ">" + sum_ignore_string + "</td>\n";
			if(type_arr[q] == 1) fin_html += "<td" + table_end_class + ">" + sum_arr[q] + csv[(csv.length > 1) ? 2 : 0].split(',')[q].replace(/[0-9]/g, '').replace('.', '') + "</td>\n";
		}
		
		fin_html += "</tr>\n";   //add new row end tag
	}


	document.getElementById(table_id).innerHTML = fin_html;   //finally insert html data to html table
			

	function get_num(str){
		var float = parseFloat(str);   //try parse float number from string

		if(isNaN(float)){   //check NaN value
			return 0;   //return 0
		}else{
			return float;   //return float
		}
	}
}		