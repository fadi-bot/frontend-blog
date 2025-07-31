import posts from './post/data'

export async function onRequestGet() {
    return new Response(JSON.stringify(posts), {
        headers: { 'Content-Type': 'application/json' }
    });
}