const express = require("express");

const request = require("request");
const cheerio = require("cheerio");

const Giveaway = require("../models/giveaway");

const router = express.Router();

router.get("/api/giveaways/:id", (req, res, next) => {
  let url = "";
  if(req.params.id == 1) {
    url = "https://sharewareonsale.com/product-tag/giveaway+active-deals";
  } else {
    url = "https://sharewareonsale.com/product-tag/giveaway+active-deals/page/" + req.params.id;
  }
  let data = [];

  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      $(".site-main .products .page-title").each((i, el) => {
        const giveaway = new Giveaway();

        //Name of giveaway
        let name = $(el).find("a div div h1 span").text();
		length = name.length;
		if(name[length - 1] == ']') {
			name = name.split('[')[0]
		}
        giveaway.name = name;

        //For PC or Not
        let pc = $(el).find("a div div h1 span span").text();
        giveaway.pcOrNot = pc;

        //Price
        let price = $(el).find("a div div span div span del").text();
        giveaway.price = price;

        //link
        let link = $(el).find("a").attr("href");
        giveaway.link = link;

        //link to detail
        link += "";
        link = link.split("/");
        giveaway.linkToDetail = link[4];

        //Image URL
        let imageUrl = $(el).find("a div img").attr("src");
        giveaway.imageUrl = imageUrl;
        
        data.push(giveaway);
      });
    }
  });
  let interval = setInterval(() => {
    if (data.length > 0) {
      res.status(200).json({
        message: "Data fetched Successfully",
        data: data,
      });
      clearInterval(interval);
    }
  }, 500);
});

router.get("/api/giveaway/getDetail/:id", (req, res, next) => {
  let url = "https://sharewareonsale.com/s/" + req.params.id;
  let data = []

  request(url, (error, response, html) => {
    if(!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      let link = $(".site-content .content-area .site-main a").attr("href");
	  if(link[0] == '/') {
		link = "https://sharewareonsale.com" + link;
	  }
      data.push(link);

      $(".site-content .content-area .site-main article .entry-content #product_description #product_description_text p").each((i, el) => {
        data.push([$(el).text()])
      });
    }
  });
  let interval = setInterval(() => {
    if (data.length > 0) {
      link = data[0];
      rem = data.filter(r => r !== link);
      res.status(200).json({
        message: "Data fetched Successfully",
        data: [link, rem]
      });
      clearInterval(interval);
    }
  }, 500);
});

router.get("/api/giveaway/getPagination", (req, res, next) => {
  let data = 0;
  let url = "https://sharewareonsale.com/product-tag/giveaway+active-deals";

  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      $(".site-main .woocommerce-pagination ul").each((i, el) => {
        let pagination = $(el).find("li").text();
        const length = pagination.length;

        if(parseInt(pagination[length-1])) {
          data = parseInt(pagination[length-1]);
        } else {
          data = parseInt(pagination[length-2]);
        }
      });
    }
  });

  let interval = setInterval(() => {
    if (data > 0) {
      res.status(200).json({
        message: "Data fetched Successfully",
        data: data,
      });
      clearInterval(interval);
    }
  }, 500);
});

module.exports = router;
