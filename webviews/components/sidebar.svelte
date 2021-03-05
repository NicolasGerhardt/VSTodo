<script lang="ts">
    import { onMount } from "svelte";

    let count: number = Number(localStorage.getItem("count")) ?? 0;
    let text = "";
    let todos: Array<{ text: string; completed: boolean }> =
        JSON.parse(String(localStorage.getItem("todos"))) ?? [];

    onMount(() => {
        window.addEventListener("message", (event) => {
            const message = event.data; // The json data that the extension sent
            console.log({ message });
            switch (message.command) {
                case "new-todo":
                    todos = [
                        { text: message.value, completed: false },
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
        todos = [{ text, completed: false }, ...todos];
        text = "";
        localStorage.setItem("todos", JSON.stringify(todos));
    }}
>
    <input bind:value={text} />
</form>

<ul>
    {#each todos as { text, completed } (text)}
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
