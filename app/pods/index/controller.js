import Controller from '@ember/controller';

export default Controller.extend({
  swipers: [
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524103994&di=5827c0ccda27ee4a36f116f54b79b557&imgtype=jpg&er=1&src=http%3A%2F%2Fpic14.nipic.com%2F20110610%2F7103350_110047818000_2.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524104079&di=08520f2862408108fa72190c90d1ee14&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F86d6277f9e2f07082d92173be224b899a901f271.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523507598422&di=7197453b73310d46dfe86a6c0f8ea22d&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Ff3d3572c11dfa9ec3d120b0068d0f703918fc1ed.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524103839&di=c27a73cf65bc86679870dcbaeb631770&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fb7fd5266d0160924a1a45d3fde0735fae6cd3414.jpg',
    'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1558457222,1064131740&fm=27&gp=0.jpg',
    'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2799387705,902425450&fm=27&gp=0.jpg'
  ],
  actions: {
    openSearch(event) {
      event.target.blur();
      this.set('openSearch', true);
    }
  }
});
