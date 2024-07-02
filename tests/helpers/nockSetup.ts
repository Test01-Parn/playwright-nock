import nock from 'nock';

export const setupNock = () => {
  const base = nock('https://jsonplaceholder.typicode.com').persist();

  base.get('/posts').reply(200, new Array(100).fill(null).map((_, i) => ({
    userId: Math.floor(i / 10) + 1,
    id: i + 1,
    title: `title ${i + 1}`,
    body: `body ${i + 1}`,
  })));

  base.get('/posts/10').reply(200, {
    userId: 1,
    id: 10,
    title: 'optio molestias id quia eum',
    body: 'quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error',
  });

  base.get('/posts/101').reply(404, {});

  base.get('/posts/a').reply(404, {});

  base.get('/posts/12/comments').reply(200, [
    {
      postId: 12,
      id: 56,
      name: 'et dolorem corrupti sed molestias',
      email: 'Vince_Crist@heidi.biz',
      body: 'cum esse odio nihil reiciendis illum quaerat\nest facere quia\noccaecati sit totam fugiat in beatae\nut occaecati unde vitae nihil quidem consequatur',
    },
    {
      postId: 12,
      id: 60,
      name: 'expedita libero quos cum commodi ad',
      email: 'Americo@estrella.net',
      body: 'error eum quia voluptates alias repudiandae\naccusantium veritatis maiores assumenda\nquod impedit animi tempore veritatis\nanimi et et officiis labore impedit blanditiis repudiandae',
    },
  ]);

  base.get('/posts/101/comments').reply(200, []);

  base.post('/posts', {
    title: 'foo',
    body: 'bar',
    userId: 1,
  }).reply(201, {
    title: 'foo',
    body: 'bar',
    userId: 1,
    id: 101,
  });

  base.post('/posts', {}).reply(201, {
    id: 101,
  });

  base.put('/posts/1', {
    title: 'editingTitle',
    body: 'editingBody',
  }).reply(200, {
    title: 'editingTitle',
    body: 'editingBody',
    id: 1,
  });

  base.post('/posts/999', {
    title: 'editingTitle',
    body: 'editingBody',
  }).reply(404, {});
};
