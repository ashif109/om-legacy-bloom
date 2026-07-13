const fs = require('fs');
const path = require('path');

const models = ['Education', 'Skill', 'SocialWork', 'Training', 'Workshop', 'Event', 'Seminar', 'Camp', 'Project', 'Publication', 'Download', 'Testimonial', 'Gallery', 'Settings'];

let apiAppend = '';
models.forEach(model => {
  const getFn = 'get' + model + 's';
  const addFn = 'add' + model;
  const updateFn = 'update' + model;
  const deleteFn = 'delete' + model;
  
  apiAppend += `
// ${model}
export const ${getFn} = createServerFn({ method: "GET" }).handler(async () => {
  await connectDB();
  const items = await mongoose.models.${model}.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(items));
});

export const ${addFn} = createServerFn({ method: "POST" })
  .validator((data: { token: string, item: any }) => data)
  .handler(async ({ data }) => {
    verifyAuth(data.token);
    await connectDB();
    const item = await mongoose.models.${model}.create(data.item);
    return JSON.parse(JSON.stringify(item));
  });

export const ${updateFn} = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string, item: any }) => data)
  .handler(async ({ data }) => {
    verifyAuth(data.token);
    await connectDB();
    const item = await mongoose.models.${model}.findByIdAndUpdate(data.id, data.item, { new: true });
    return JSON.parse(JSON.stringify(item));
  });

export const ${deleteFn} = createServerFn({ method: "POST" })
  .validator((data: { token: string, id: string }) => data)
  .handler(async ({ data }) => {
    verifyAuth(data.token);
    await connectDB();
    await mongoose.models.${model}.findByIdAndDelete(data.id);
    return { success: true };
  });
`;
});

const apiPath = path.join(__dirname, 'src/lib/api.ts');
fs.appendFileSync(apiPath, apiAppend);
console.log('Appended API endpoints.');
