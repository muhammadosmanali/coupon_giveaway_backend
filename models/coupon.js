class Coupon {
  constructor(day, language, heading, category, linkToDetail, linkToCoupon, categoryInUrl, imageUrl, description) {
      this.day = day;
      this.language = language;
      this.heading = heading;
      this.category = category;
      this.linkToDetail = linkToDetail;
      this.linkToCoupon = linkToCoupon;
      this.categoryInUrl = categoryInUrl;
      this.imageUrl = imageUrl;
      this.description = description;
  }
}

module.exports = Coupon;
