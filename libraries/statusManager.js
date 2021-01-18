class statusManager {
  constructor(_bot) {
    this.bot = _bot;
    this.status = 0;
    this.stats = [
      { text: `MEE6 suffer.`, type: { type: "WATCHING" } },
      { text: `MEE6's grave.`, type: { type: "WATCHING" } },
      { text: `Get me verified`, type: { type: "PLAYING" } },
      /*{ text: ``, type: { type: "LISTENING" } },
        { text: ``, type: { type: "PLAYING" } },*/
    ];
  }
  ChangeStatus() {
    this.status = this.status < this.stats.length - 1 ? this.status + 1 : 0;
    let stat = this.stats[this.status];
    this.bot.user.setActivity(stat.text, stat.type);
  }
}
module.exports = (_bot) => {
  return new statusManager(_bot);
};
