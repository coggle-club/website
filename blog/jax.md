## Jax

JAX is Autograd and XLA, brought together for high-performance machine learning research. With its updated version of Autograd, JAX can automatically differentiate native Python and NumPy functions. It can differentiate through loops, branches, recursion, and closures, and it can take derivatives of derivatives of derivatives. 

```python
import jax.numpy as jnp
from jax import grad, jit, vmap

def predict(params, inputs):
  for W, b in params:
    outputs = jnp.dot(inputs, W) + b
    inputs = jnp.tanh(outputs)  # inputs to the next layer
  return outputs                # no activation on last layer

def loss(params, inputs, targets):
  preds = predict(params, inputs)
  return jnp.sum((preds - targets)**2)

grad_loss = jit(grad(loss))  # compiled gradient evaluation function
perex_grads = jit(vmap(grad_loss, in_axes=(None, 0, 0)))  # fast per-example grads
```

- [https://jax.readthedocs.io/en/latest/](https://jax.readthedocs.io/en/latest/)
- [🤗 Hugging Face Models](https://huggingface.co/models?library=jax)

--- 

## Package

### Flax

Flax is a neural network library and ecosystem for JAX that is designed for flexibility. Flax is in use by a growing community of researchers and engineers at Google who happily use Flax for their daily research.

- Doc: [https://flax.readthedocs.io/en/latest/index.html](https://flax.readthedocs.io/en/latest/index.html)
- Github: [https://github.com/google/flax](https://github.com/google/flax)

### optax

Optax is a gradient processing and optimization library for JAX. It is designed to facilitate research by providing building blocks that can be recombined in custom ways in order to optimise parametric models such as, but not limited to, deep neural networks.

- Doc: [https://optax.readthedocs.io/en/latest/](https://optax.readthedocs.io/en/latest/)
- Github: [https://github.com/deepmind/optax](https://github.com/deepmind/optax)

### Mctx

Mctx is a library with a JAX-native implementation of Monte Carlo tree search (MCTS) algorithms such as AlphaZero, MuZero, and Gumbel MuZero. For computation speed up, the implementation fully supports JIT-compilation. 

- Github: [https://github.com/deepmind/mctx](https://github.com/deepmind/mctx)


### Brax

Brax is a differentiable physics engine that simulates environments made up of rigid bodies, joints, and actuators. Brax is written in JAX and is designed for use on acceleration hardware. It is both efficient for single-device simulation, and scalable to massively parallel simulation on multiple devices, without the need for pesky datacenters.

- Github: [https://github.com/google/brax](https://github.com/google/brax)

### Trax

Trax is an end-to-end library for deep learning that focuses on clear code and speed. It is actively used and maintained in the Google Brain team. This notebook (run it in colab) shows how to use Trax and where you can find more information.

- Github: [https://github.com/google/trax](https://github.com/google/trax)

### Jraph

Jraph (pronounced "giraffe") is a lightweight library for working with graph neural networks in jax. It provides a data structure for graphs, a set of utilities for working with graphs, and a 'zoo' of forkable graph neural network models.

- Github: [https://github.com/deepmind/jraph](https://github.com/deepmind/jraph)