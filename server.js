var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape/n3/vocabularies', function(req, res){

	let max_number = 18

	for(let i = 1; i<= max_number; i++){
		let url = 'https://tuhoconline.net/luyen-thi-n3-tu-vung-tieng-nhat-n3.html/' + i;

	    request(url, function(error, response, html){
	        // First we'll check to make sure no errors occurred when making the request
	        if(error){
	        	console.log("error:")
	        	console.log(error);
	        	// continue;
	        }else{
	            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
	            var $ = cheerio.load(html);

	            var result_text = "";

	            var $html_content = $('.entry-content.clearfix')
	            {
	                let $data = $html_content;
	                $data.find(".post-nav-links").remove();
	                $data.find(".below-entry-meta").remove();
	                $data.find("h1").remove();
	                $data.find("h2").remove();
	                $data.children('p').first().remove();
	                $data.find('.code-block.code-block-1').remove();
	                $data.find('.code-block.code-block-2').remove();

	                let $first_h3 = $data.find("h3").first();
	                $first_h3.prev().remove();
	                $first_h3.prev().remove();
	                $first_h3.prev().remove();
	                $first_h3.prev().remove();


	                let $share_elements = $data.find('.sharedaddy.sd-sharing-enabled');
	                $share_elements.prev().remove();
	                $share_elements.prev().remove();
	                $share_elements.prev().remove();

	                $share_elements.next().remove();
	                $share_elements.next().remove();
	                $share_elements.next().remove();
	                $share_elements.next().remove();
	                $share_elements.next().remove();
	                $share_elements.next().remove();
	                $share_elements.next().remove();
	                $share_elements.next().remove();
	                $share_elements.next().remove();
	                $share_elements.next().remove();
	                $share_elements.next().remove();
	                $share_elements.next().remove();
	                $share_elements.next().remove();

	                $share_elements.remove();
	            }

	            $html_content.children().map(function(index, elem) {
	            	let $element = $(elem);

	            	let string = $element.text();

	            	string = string.replace(" : ", "\t");
	            	string = string.replace(" : ", "\t");
	            	string = string.replace("&nbsp;", " ");
	            	result_text += string + "\n";

	            	return null;
	            })

	        }

			// fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
			fs.writeFile('output/n3/vocabularies/output_' + ("" + i).padStart(2, '0') + '.txt', result_text, function(err){
			    console.log('File successfully written!');
			})

	    })

	} // for

	res.send("Done!")

})

app.listen('8081')

console.log('Server is serving on port 8081');
console.log('Try this link');
console.log('http://localhost:8081/scrape/n3/vocabularies');


exports = module.exports = app;
