const { DateTime } = require('luxon');
module.exports = function(eleventyConfig) {
  const pathPrefix = process.env.ELEVENTY_PATH_PREFIX || '/';
  eleventyConfig.ignores.add('src/_private/**');
  eleventyConfig.addPassthroughCopy({ 'src/assets': 'assets' });
  eleventyConfig.addFilter('readableDate', d => DateTime.fromJSDate(d, { zone: 'utc' }).toFormat('dd.LL.yyyy'));
  eleventyConfig.addFilter('htmlDateString', d => DateTime.fromJSDate(d, { zone: 'utc' }).toFormat('yyyy-LL-dd'));
  eleventyConfig.addFilter('json', v => JSON.stringify(v));
  eleventyConfig.addFilter('url', v => {
    if (!v || typeof v !== 'string' || !v.startsWith('/')) return v;
    const prefix = pathPrefix === '/' ? '' : pathPrefix.replace(/\/$/, '');
    return `${prefix}${v}`.replace(/\/+/g, '/');
  });
  const publicItems = api => api.getFilteredByGlob('./src/posts/**/*.md')
    .filter(item => !(Array.isArray(item.data.tags) && item.data.tags.includes('private')))
    .sort((a,b) => b.date - a.date);
  eleventyConfig.addCollection('projects', api => publicItems(api).filter(item => (item.data.tags || []).includes('project')));
  eleventyConfig.addCollection('publicPosts', api => publicItems(api).filter(item => !(item.data.tags || []).includes('project')));
  return {
    dir: { input: 'src', output: '_site', includes: '_includes', layouts: '_includes', data: '_data' },
    markdownTemplateEngine: 'njk', htmlTemplateEngine: 'njk', pathPrefix
  };
};
