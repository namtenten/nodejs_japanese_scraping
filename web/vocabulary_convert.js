function Html2JsonString(html) {
	// let html_header = "<!DOCTYPE html>\n<html>\n\t<head><meta charset=\"utf-8\">\n<title>JLPT n2</title>\n\t<link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css\">\n\t</head>\n\t<body>\n\t\t<table>" + result_text + "\n\t\t</table>\n\t</body>\n</html>"
	// let html_header = "<!DOCTYPE html>\n<html>\n\t(.*)<body>\n\t\t<table>(.*)</td></tr>"

	let result = ""
	let s = html
	s = s.replace(/\t/g, "")
	s = s.replace(/\n/g, "")
	s = s.replace(/<\!DOCTYPE html>(.*?)<\/td><\/tr>/, "")
	s = s.replace(/<\/table><\/body><\/html>/, "")
	s = s.replace(/ /g, " ")


	s = s.replace(/<tr><td>Từ vựng N(\d) Ngày (\d*)?<\/td><\/tr>/g, "")

	// <tr><td>文字を削除する (もじをさくじょする)</td><td>xóa từ, xóa chữ</td></tr>
	s = s.replace(/<tr><td>/g, '{"word":"')
	s = s.replace(/<\/td><td>/g, '","meaning":"')
	s = s.replace(/<\/td><\/tr>/g, '"},\n')
// console.log(s)

	let arr = s.split("\n")
// console.log(arr)
	s = ""
	arr = arr.map(function(line_str) {
		// let first_str = line_str.replace(/,"meaning":"(.*)/, "")
		let line_arr = line_str.split(',"meaning":"')
		let first_str = ""
		let second_str = ""
		if(line_arr.length > 1){
// console.log("line_arr")
// console.log(line_arr)
			first_str = line_arr[0]
			second_str = line_arr[1]
			if(first_str.indexOf(" (") > 0){
				first_str = first_str.replace(/ \(/, '","furigana":"')
				if(first_str.indexOf(")\"") > 0){
					first_str = first_str.replace(/\)\"/, '')
					// first_str = first_str.replace(/\)\"/, '","meaning":"')
				}
			}else{
				first_str += ',"furigana":"'
			}
			line_str = first_str + '","meaning":"' + second_str + "\n"
// console.log(line_str)
			s += line_str
		}
		return line_str
	})
	// result = "[" + s + "]"
	result = s
	return result
}

// function loadJSON(json_path = "./japanese/jlpt2.json", callback = (responseText) => {return JSON.parse(responseText)}) {
//   var xobj = new XMLHttpRequest()
//       xobj.overrideMimeType("application/json")
//   xobj.open('GET', json_path, true);
//   xobj.onreadystatechange = function () {
//     if (xobj.readyState == 4 && xobj.status == "200") {
//       // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
//       return callback(xobj.responseText);
//     }
//   }
//   return xobj.send(null);
// }


function ReadTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText
                return allText
                // alert(allText);
            }
        }
    }
    rawFile.send(null);
}

// readTextFile("file:///C:/your/path/to/file.txt");

function WriteFile(file_name = "file:///D:\\Store\\Projects\\nodejs\\nodejs_japanese_scraping\\output\\n2\\vocabularies\\json\\week5.json", content)
{
	var fso = new ActiveXObject("Scripting.FileSystemObject");

	var fh = fso.CreateTextFile(file_name, true);

	fh.WriteLine(content);

	fh.Close();
}

function convert() {
	// // D:\Store\Projects\nodejs\nodejs_japanese_scraping\output\n2\vocabularies
	// let html_content = ReadTextFile("file:///D:\\Store\\Projects\\nodejs\\nodejs_japanese_scraping\\output\\n2\\vocabularies\\output_05.html")
	// if(html_content){
	// 	console.log(html_content)
	// 	return
	// 	let json_str = Html2JsonString(html_content)
	// 	WriteFile("../output/n2/vocabularies/json/week5.json", json_str)
	// }
}

// convert()

jQuery(document).ready(function($) {
	$("button#convert").click(function(event) {
		// console.log("convert")
		let $input = $('#input')
		let input_value = $input.val()
		let $output = $('#output')
		let json_str = Html2JsonString(input_value)
// console.log(input_value)
// console.log(json_str)
		$output.val(json_str)
	});
});