import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample forum data
const forumPosts = [
  {
    id: 1,
    title: 'Recommendations for sustainable materials?',
    author: 'GreenDesigner',
    date: '2025-04-20',
    content: 'I am working on an eco-friendly project and looking for sustainable materials that don\'t compromise on aesthetics. Any suggestions from the community?',
    replies: 3,
    category: 'materials'
  },
  {
    id: 2,
    title: 'Small space optimization techniques',
    author: 'SpaceMaximizer',
    date: '2025-04-18',
    content: 'Working with a 500 sq ft apartment and need to make it feel spacious while maintaining functionality. Would love to hear your approaches!',
    replies: 5,
    category: 'small-spaces'
  },
  {
    id: 3,
    title: 'Mixing modern and vintage elements',
    author: 'StyleFusion',
    date: '2025-04-15',
    content: 'How do you successfully blend modern furniture with vintage pieces? Looking for tips on creating a cohesive look.',
    replies: 7,
    category: 'style'
  },
  {
    id: 4,
    title: 'Lighting recommendations for home office',
    author: 'RemoteWorker',
    date: '2025-04-12',
    content: 'I need suggestions for proper lighting in my home office to reduce eye strain during long work hours.',
    replies: 4,
    category: 'lighting'
  },
];

const Forum = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredPosts = activeCategory === 'all' 
    ? forumPosts 
    : forumPosts.filter(post => post.category === activeCategory);

  return (
    <Layout>
      <div className="pt-24 pb-16 bg-aarav-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-serif mb-4">Design Forum</h1>
            <p className="text-aarav-gray-500 mb-8">
              Join our community of design enthusiasts to discuss ideas, seek advice, and share inspiration.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="all" className="mb-8">
                <TabsList>
                  <TabsTrigger value="all" onClick={() => setActiveCategory('all')}>All Topics</TabsTrigger>
                  <TabsTrigger value="materials" onClick={() => setActiveCategory('materials')}>Materials</TabsTrigger>
                  <TabsTrigger value="small-spaces" onClick={() => setActiveCategory('small-spaces')}>Small Spaces</TabsTrigger>
                  <TabsTrigger value="style" onClick={() => setActiveCategory('style')}>Style & Trends</TabsTrigger>
                  <TabsTrigger value="lighting" onClick={() => setActiveCategory('lighting')}>Lighting</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-6 space-y-4">
                  {filteredPosts.map(post => (
                    <Card key={post.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl font-serif">{post.title}</CardTitle>
                            <CardDescription>
                              Posted by {post.author} on {post.date}
                            </CardDescription>
                          </div>
                          <span className="bg-aarav-gray-100 px-3 py-1 text-sm rounded-full">
                            {post.replies} {post.replies === 1 ? 'reply' : 'replies'}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>{post.content}</p>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <Button variant="outline" className="text-aarav-gray-600">View Discussion</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="materials" className="mt-6 space-y-4">
                  {filteredPosts.map(post => (
                    <Card key={post.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl font-serif">{post.title}</CardTitle>
                            <CardDescription>
                              Posted by {post.author} on {post.date}
                            </CardDescription>
                          </div>
                          <span className="bg-aarav-gray-100 px-3 py-1 text-sm rounded-full">
                            {post.replies} {post.replies === 1 ? 'reply' : 'replies'}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>{post.content}</p>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <Button variant="outline" className="text-aarav-gray-600">View Discussion</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </TabsContent>
                
                
              </Tabs>
            </div>
            
            <div className="lg:col-span-1">
              <div className="border p-6 mb-6">
                <h3 className="text-xl font-serif mb-4">Start a New Topic</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="topic-title" className="block text-sm font-medium mb-1">Title</label>
                    <Input id="topic-title" placeholder="Topic title" required />
                  </div>
                  
                  <div>
                    <label htmlFor="topic-category" className="block text-sm font-medium mb-1">Category</label>
                    <select 
                      id="topic-category" 
                      className="w-full border border-input h-9 px-3 py-1 rounded-md"
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="materials">Materials</option>
                      <option value="small-spaces">Small Spaces</option>
                      <option value="style">Style & Trends</option>
                      <option value="lighting">Lighting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="topic-content" className="block text-sm font-medium mb-1">Content</label>
                    <Textarea 
                      id="topic-content" 
                      placeholder="Share your thoughts or question..." 
                      rows={5}
                      className="resize-none"
                      required
                    />
                  </div>
                  
                  <Button className="w-full bg-aarav-black hover:bg-aarav-gold text-white">
                    Post Topic
                  </Button>
                </form>
              </div>
              
              <div className="border p-6">
                <h3 className="text-xl font-serif mb-4">Forum Guidelines</h3>
                <ul className="space-y-3 list-disc pl-5 text-aarav-gray-600">
                  <li>Be respectful and constructive in your comments</li>
                  <li>Stay on topic and relevant to interior design</li>
                  <li>No promotional content without prior approval</li>
                  <li>Include images where helpful (max 2MB per image)</li>
                  <li>Check existing topics before creating a new one</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Forum;
