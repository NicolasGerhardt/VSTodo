<script lang="ts">
    let count: number = Number(localStorage.getItem("count")) ?? 0;
    let text = "";
    let todos: Array<{ text: string; completed: boolean; id: string }> =
        JSON.parse(String(localStorage.getItem("todos"))) ?? [];
</script>

<div>{count}</div>
<button
    on:click={() => {
        count++;
        localStorage.setItem("count", count.toString());
    }}
>
    click
</button>
<hr />
<form
    on:submit|preventDefault={(e) => {
        todos = [
            { text, completed: false, id: Date.now().toString() },
            ...todos,
        ];
        text = "";
        localStorage.setItem("todos", JSON.stringify(todos));
    }}
>
    <input bind:value={text} />
</form>

<ul>
    {#each todos as { text, id, completed } (id)}
        <li
            class:complete={completed}
            on:click={() => {
                completed = !completed;
                localStorage.setItem("todos", JSON.stringify(todos));
            }}
        >
            {text}
        </li>
    {/each}
</ul>

<style>
    .complete {
        text-decoration: line-through;
    }
</style>
