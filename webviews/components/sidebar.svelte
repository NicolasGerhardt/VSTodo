<script lang="ts">
    import { onMount } from "svelte";

    let count: number = 0;
    let text = "";
    let todos: Array<{ text: string; completed: boolean; id: number }> = [];

    onMount(() => {
        window.addEventListener("message", (event) => {
            const message = event.data; // The json data that the extension sent
            console.log({ message });
            switch (message.command) {
                case "new-todo":
                    todos = [
                        { text: message.value, completed: false, id: count++ },
                        ...todos,
                    ];
                    break;
            }
        });
    });
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
        todos = [{ text, completed: false, id: count++ }, ...todos];
        text = "";
    }}
>
    <input bind:value={text} />
</form>

<ul>
    {#each todos as { text, completed, id } (id)}
        <li
            class:complete={completed}
            on:click={() => {
                completed = !completed;
            }}
        >
            {text}
        </li>
    {/each}
</ul>

<!-- svelte-ignore missing-declaration -->
<button
    on:click={() => {
        tsvscode.postMessage({
            command: "onInfo",
            value: "info message",
        });
    }}>Click Me (info)</button
>

<!-- svelte-ignore missing-declaration -->
<button
    on:click={() => {
        tsvscode.postMessage({
            command: "onError",
            value: "error message",
        });
    }}>Click Me (error)</button
>

<style>
    .complete {
        text-decoration: line-through;
    }
</style>
