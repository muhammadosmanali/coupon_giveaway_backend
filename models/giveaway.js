class Giveaway {
    constructor(name, pcOrNot, price, link, linkToDetail, imageUrl) {
        this.name = name;
        this.pcOrNot = pcOrNot;
        this.price = price;
        this.link = link;
        this.linkToDetail = linkToDetail;
        this.imageUrl = imageUrl;
    }
}

module.exports = Giveaway;