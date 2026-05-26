import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::product.product', ({ strapi }) => ({
  async incrementView(ctx: any) {
    const { slug } = ctx.params;

    const products = await strapi.documents('api::product.product').findMany({
      filters: { slug },
      limit: 1,
    } as any);

    if (!products || products.length === 0) {
      return ctx.notFound('Product not found');
    }

    const product = products[0] as any;

    const updated = await strapi.documents('api::product.product').update({
      documentId: product.documentId,
      data: { view_count: (product.view_count || 0) + 1 },
    } as any);

    return ctx.send({ view_count: (updated as any).view_count });
  },
}));
